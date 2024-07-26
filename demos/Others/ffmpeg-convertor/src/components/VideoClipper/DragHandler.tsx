import React, { ReactElement, useEffect, useRef, useState } from "react";

export enum HandlerEnum {
    START = 'start',
    END = 'end'
}
interface DragHandlerPropsType extends React.HtmlHTMLAttributes<HTMLDivElement> {
    type: HandlerEnum
    onPositionChange: (position: number, percentage: number) => void
}
export default function DragHandler({ type, onPositionChange, children }: DragHandlerPropsType) {
    const offset = type === HandlerEnum.START ? 0 : 20
    const [position, setPosition] = useState(offset);
    const refHandler = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const { width: parentElementWidth } = refHandler.current?.parentElement?.getBoundingClientRect() ?? { x: 0, width: 0 };
        const initPosition = type === HandlerEnum.START ? 0 : parentElementWidth - (refHandler.current?.offsetWidth || 0)
        setPosition(initPosition)
        onPositionChange(initPosition, type === HandlerEnum.START ? 0 : 100)
    }, [])

    let dragDeltaX = 0;
    let startPosition = 0;

    // 处理鼠标按下逻辑
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        const { x: parentElementX } = refHandler.current?.parentElement?.getBoundingClientRect() ?? { x: 0, width: 0 };
        startPosition = parentElementX;
    };

    // 处理松开鼠标后的逻辑
    const handleMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        console.log("mouseup event");
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    // 处理拖动逻辑
    const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        dragDeltaX = e.clientX - startPosition;

        const { x: parentElementX, width: parentElementWidth } = refHandler.current?.parentElement?.getBoundingClientRect() ?? { x: 0, width: 0 };
        const handlerWidth = refHandler.current?.offsetWidth || 0

        // default
        const default_minX = parentElementX - startPosition + offset;
        const default_maxX = parentElementWidth;
        let minX = default_minX;
        let maxX = default_maxX;
        const anotherHandler = type === HandlerEnum.START ? refHandler.current?.nextElementSibling as HTMLElement : refHandler.current?.previousElementSibling as HTMLElement

        if (type === HandlerEnum.START) {
            maxX = anotherHandler?.offsetLeft! - offset - handlerWidth || default_maxX
            minX = parentElementX - startPosition + offset
        } else {
            maxX = parentElementWidth - handlerWidth
            minX = anotherHandler?.offsetLeft! + offset || default_minX
        }

        if (dragDeltaX > minX && dragDeltaX < maxX) {
            setPosition(dragDeltaX);
            onPositionChange(dragDeltaX, Math.floor(dragDeltaX / parentElementWidth * 100))
        }
    };

    return (
        <div
            ref={refHandler}
            onMouseDown={(e) => handleMouseDown(e)}
            style={{ left: position }}
            className="left-handler z-20 h-[130%] w-4 rounded-2xl bg-white/80 absolute cursor-pointer"
        >
            <span className="absolute -bottom-4 font-extralight select-none text-xs left-1/2 -translate-x-1/2" >{children}</span>
        </div>
    );
}
