import { useState } from "react";

const useVisible = () => {
    const [visible, setVisible] = useState(false)
    function changeVisible() {
        setVisible(!visible)
    }
    return {
        visible, changeVisible
    }
}

export{
    useVisible
}