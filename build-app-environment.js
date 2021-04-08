const dockerRunTemplate = (version) => {
  return `{
  "AWSEBDockerrunVersion": 2,
  "volumes": [
    {
      "name": "nginx-conf",
      "host": {
        "sourcePath": "/var/app/current/conf/nginx/conf.d"
      }
    }
  ],
  "containerDefinitions": [
    {
      "name": "brand-fe-prod",
      "image": "196761233825.dkr.ecr.ap-southeast-1.amazonaws.com/brand-fe-prod:${version}",
      "essential": true,
      "memory": 256
    },
    {
      "name": "nginx",
      "image": "196761233825.dkr.ecr.ap-southeast-1.amazonaws.com/nginx:latest",
      "essential": true,
      "memory": 128,
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 80
        },
        {
          "hostPort": 443,
          "containerPort": 443
        }
      ],
      "links": [
        "brand-fe-prod"
      ],
      "mountPoints": [
        {
          "sourceVolume": "nginx-conf",
          "containerPath": "/etc/nginx/conf.d",
          "readOnly": true
        }
      ]
    }
  ]
}
`;
};

const nginxTemplate = (version) => {
  return `upstream application {
  server brand-fe-prod:3041;
}

server {
\tlisten 80;
\tserver_name localhost;
\troot /var/www/html;

    proxy_connect_timeout 30;
    proxy_send_timeout 30;
    proxy_read_timeout 30;
    send_timeout 30;
    fastcgi_buffers         1024 32k;
    fastcgi_buffer_size     64k;
    fastcgi_send_timeout    30s;
    fastcgi_read_timeout 30s;
    fastcgi_connect_timeout 30s;

    gzip on;
\tgzip_disable "msie6";
\tgzip_vary on;
\tgzip_proxied any;
\tgzip_comp_level 6;
\tgzip_buffers 16 8k;
\tgzip_min_length 256;
\tgzip_types application/javascript text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;

  access_log /var/log/nginx/access.log main;

  # 1) Special, somewhat redundant location to always proxy
  #    the health check to the upstream server, without checking
  #    if the request came in over HTTP or HTTPS.
  location /manage/health {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Url-Scheme $scheme;
    proxy_set_header Host $http_host;

    proxy_next_upstream error;
    proxy_redirect off;
    access_log off;

    default_type application/json;
    return 200 '{"version":"${version}"}';

    break;
  }

  # Our main location to proxy everything else to the upstream
  # server, but with the added logic for enforcing HTTPS.
location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Url-Scheme $scheme;
    proxy_set_header Host $http_host;

    proxy_redirect off;
    proxy_next_upstream error;

    # 2) Any request that did not originally come in to the ELB
    #    over HTTPS gets redirected.
    # if ($http_x_forwarded_proto != "https") {
    #    rewrite ^(.*)$ https://$http_host$1 permanent;
    # }

    proxy_pass http://application;

    # Add HTTP Strict Transport Security for good measure.
    proxy_set_header Strict-Transport-Security "max-age=31536000; includeSubDomains;";
  }
}
`;
};
var fs = require('fs');
var path = require('path');
fs.writeFile(path.resolve(__dirname + '/Dockerrun.aws.json'), dockerRunTemplate(process.env.IMAGE_TAG), function (err) {
  if (err) throw err;
  console.log('Dockerrun file is created successfully.');
});

fs.writeFile(path.resolve(__dirname + '/conf/nginx/conf.d/default.conf'), nginxTemplate(process.env.IMAGE_TAG), function (err) {
  if (err) throw err;
  console.log('default file is created successfully.');
});


