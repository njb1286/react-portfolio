import { faTrash, faSignOutAlt, faEdit, faTrashCan, faSpinner, faPlusCircle, faPhoneFlip, faEnvelope, faMapLocationDot, faLock } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';

const Icons = () => {
    return library.add(faTrash, faSignOutAlt, faEdit, faTrashCan, faSpinner, faPlusCircle, faPhoneFlip, faEnvelope, faMapLocationDot, faLock);
}

export default Icons;