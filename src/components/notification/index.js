import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "../../constants";

let nextNotificationId = 0;

const options = {
  success: {
    icon: "icon_success.svg",
    backgroundColor: "#17C108",
  },
  warning: {
    icon: "icon_warning.svg",
    backgroundColor: "#EBB700",
  },
  error: {
    icon: "icon_error.svg",
    backgroundColor: "#E10007",
  },
  info: {
    icon: "icon_info.svg",
    backgroundColor: "#0072F8",
  },
};

const NotificationProvider = () => {
  const notifications = useSelector((state) => state.get("notifications")).toJS() ?? [];
  const dispatch = useDispatch();
  const onHideNotification = (id) => {
    dispatch({ type: HIDE_NOTIFICATION, id });
  };
  return (
    <TransitionGroup className="notification">
      {notifications.map(({ id, title, content, status }, i) => {
        let option = options[status] || options.info;
        return (
          <CSSTransition
            key={id}
            classNames="notification"
            timeout={{
              enter: 500,
              exit: 300,
            }}
          >
            <li style={{ backgroundColor: option.backgroundColor }} key={id}>
              <div className="notification-title">
                <img style={{ margin: "4px 10px 0 0" }} width="18" height="18" src={`/images/${option.icon}`} alt="" />
                <h5>{content}</h5>
              </div>
              <button onClick={() => onHideNotification(id)} className="notification-close">
                <img src="/images/close_notifi.svg" />
              </button>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export function showNotification(dispatch, noti) {
  let notification = typeof noti === "string" ? { content: noti } : noti;
  nextNotificationId++;
  // Start timeout to hide the notification

  ((id) => {
    setTimeout(() => {
      dispatch({ type: HIDE_NOTIFICATION, id });
    }, 5000);
  })(nextNotificationId);

  return dispatch({
    type: SHOW_NOTIFICATION,
    value: {
      ...notification,
      id: nextNotificationId,
    },
  });
}

export default NotificationProvider;
