// type shapeData = {
//     id: number,
//     x: number,
//     y: number,
//     shape: string

import { shapeData } from "../DataTypes/ShapeDateType";

// }
type ShapeType = {
    id: number,
    x: number,
    y: number,
    shape: string,
    allShapes: shapeData[],
    setShapes: React.Dispatch<React.SetStateAction<shapeData[]>>
}

export default function Shape(
    {
        id,
        x,
        y,
        shape,
        allShapes,
        setShapes
    }: ShapeType
) {
    const pic = require("../Images/" + shape + ".png");
    const circleChange = [25, 25];
    const triangleChange = [25, 32];
    const squareChange = [25, 25];
    const changes = [circleChange, triangleChange, squareChange];
    var changeInd = 0;
    if (shape == "triangle") {
        changeInd = 1;
    } else if (shape == "square") {
        changeInd = 2;
    }
    
    return (
        <div style={{ position: "absolute", left: x - changes[changeInd][0], top: y - changes[changeInd][1]}}>
            <img alt="pic" src={String(pic)} width={50} height={50} onDoubleClick={() => {
                console.log("i was double clicked");
                for (let i = 0; i < allShapes.length; i++) {
                    if (allShapes[i].id == id) {
                        const temp1 = allShapes.slice(0, i);
                        const temp2 = allShapes.slice(i + 1);
                        for (let j = 0; j < temp2.length; j++) {
                            temp1.push(temp2[j]);
                        }
                        setShapes(temp1);
                        return
                    }
                }
            }} />
        </div>
    )
}