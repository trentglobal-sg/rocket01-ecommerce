import { useFlashMessage } from "./FlashMessageStore";

export default function FlashMessageDisplay() {
    const { flashMessage} = useFlashMessage();
    return <>
        {
            flashMessage.message &&
                <div className={`flash-alert alert alert-${flashMessage.type}`}>
                    {flashMessage.message}
                </div>
        }
    
    </>
}