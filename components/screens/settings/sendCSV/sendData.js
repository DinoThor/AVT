import { backupData } from "../../../../utils/dataService";

export const sendData = () => {
    backupData().then((data) => {
        console.log(data);
    })
};