import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Stack from "../utils/Stack";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
   const [notificationHist] = useState(new Stack(
      JSON.parse(sessionStorage.getItem('notHist')) || []
   ));

   const [notifications, setNotifications] = useState([]);
   useEffect(() => { 
      sessionStorage.setItem("notHist", JSON.stringify(notificationHist.getItems()));
   }, [notifications]);

   const addNotification = (type, message) => {
      const id = new Date().toLocaleDateString('pt-BR')+' - '+new Date().toLocaleTimeString('pt-BR');

      notificationHist.push({id, type, message});
      sessionStorage.setItem("notHist", JSON.stringify(notificationHist.getItems()));
      setNotifications(notificationHist.getItems());
      toast[type](message);
   }

   const showLastNotification = () => {
      const notification = notificationHist.peek();
      toast[notification.type](notification.message);
   }

   const getNotificationHist = () => notificationHist.getItems();
   const getLastNotification = () => notificationHist.pop();

   return (
      <NotificationContext.Provider value={{ addNotification, getNotificationHist, getLastNotification, showLastNotification }}>
         {children}
      </NotificationContext.Provider>
   )
}

export const useNotification = () => {
   return useContext(NotificationContext);
}