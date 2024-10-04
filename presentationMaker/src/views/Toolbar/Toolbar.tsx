import { ReactNode } from "react"

type toolbarProps = {
    tool: ReactNode
}

export const Toolbar = ({ tool }: toolbarProps) => {
    return(
        <div className="">
            <div className="">
                {tool}
            </div>
        </div>
    )
}