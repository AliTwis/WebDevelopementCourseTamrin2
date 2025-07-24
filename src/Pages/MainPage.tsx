import { useState } from "react";
import "./MainPage.css"
import Shape from "../Components/Shape";
import { shapeData } from "../DataTypes/ShapeDateType";

export default function MainPage() {
    const [canvasData, setCanvasData] = useState<shapeData[]>([]);
    const shapes = ["circle", "square", "triangle"];
    const [whichShape, setWhichShape] = useState<string>("circle");
    const [fileName, setFileName] = useState("filename");
    const [shapeId, setShapeId] = useState(0);
    var canvasDblClicked = false;
    var k = 0;
    var imgK = 0;

    function countShapeInCanvas(shape: string) {
        let count = 0;
        for (let i = 0; i < canvasData.length; i++) {
            if (canvasData[i].shape == shape) count++;
        }
        return count;
    }

    function drawShapeDrop(event: React.DragEvent<HTMLDivElement>) {
        const temp: shapeData[] = [];
        for (let i = 0; i < canvasData.length; i++) {
            temp.push(canvasData[i])
        }

        const myCanvas = document.getElementById("canvasId")
        if (myCanvas == undefined) return
        const canvasX = myCanvas.getBoundingClientRect().left;
        const canvasY = myCanvas.getBoundingClientRect().top;
        if (canvasX == undefined || canvasY == undefined) return
        if (event.clientX - canvasX < 25 || event.clientX - canvasX > myCanvas.clientWidth - 25
            || event.clientY - canvasY < 25 || event.clientY - canvasY > myCanvas.clientHeight - 25) return
        temp.push({
            id: shapeId,
            x: event.clientX - canvasX,
            y: event.clientY - canvasY,
            shape: whichShape
        })
        setCanvasData(temp);
        setShapeId(shapeId + 1);
    }

    function drawShapeClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const temp: shapeData[] = [];
        for (let i = 0; i < canvasData.length; i++) {
            temp.push(canvasData[i])
        }

        const myCanvas = document.getElementById("canvasId")
        if (myCanvas == undefined) return
        const canvasX = myCanvas.getBoundingClientRect().left;
        const canvasY = myCanvas.getBoundingClientRect().top;
        if (canvasX == undefined || canvasY == undefined) return
        if (event.clientX - canvasX < 25 || event.clientX - canvasX > myCanvas.clientWidth - 25
            || event.clientY - canvasY < 25 || event.clientY - canvasY > myCanvas.clientHeight - 25) return
        temp.push({
            id: shapeId,
            x: event.clientX - canvasX,
            y: event.clientY - canvasY,
            shape: whichShape
        })
        setCanvasData(temp);
        setShapeId(shapeId + 1);
    }

    function PrepareFileToDownload(data : string, fileName : string, fileType : string) {
        const drawingBlob = new Blob([data], { type: fileType });
        const downloadAnchor = document.createElement("a");
        downloadAnchor.download = fileName;
        downloadAnchor.href = window.URL.createObjectURL(drawingBlob);
        const clickToDown = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true
        });
        downloadAnchor.dispatchEvent(clickToDown);
        downloadAnchor.remove();
    }

    return (
        <div>
            <div className="headerClass">
                <div className="fileNameDiv">    
                    <input className="fileNameInput" type="text" defaultValue={fileName} onChange={(str) => {
                        setFileName(str.target.value);
                        console.log(str.target.value)
                    }}/>
                </div>
                
                <center className="headerButtonsDiv">
                    <div className="headerButtons">
                        <button>
                            <label htmlFor="fileInput" className="importLabel">Import</label>
                        </button>
                        <input id="fileInput" style={{display: "none"}} type="file"  onChange={(event) => {
                            if (event.target.files == undefined) {
                                console.log("failed to read the import the file.")
                                return
                            }
                            event.target.files[0].text().then((importedData) => {
                                const temp = JSON.parse(importedData);
                                setCanvasData(temp[1]);
                            }).catch(() => console.log("couldn't read the imported file."))
                        }}></input>
                    </div>
                    <div className="headerButtons">
                        <button onClick={() => {PrepareFileToDownload(JSON.stringify([fileName, canvasData]), fileName, "text")}}>
                            export
                        </button>
                    </div>
                </center>
            </div>
            
            <div className="bodyClass">
                <div className="canvasAndCounter">
                    <div id="canvasId" className="canvas" onDragOver={(event) => { event.preventDefault() }}
                        onDrop={(event) => drawShapeDrop(event)} onClick={(event) => {
                            if (event.detail === 1) {
                                setTimeout(() => {
                                    if (canvasDblClicked) {
                                        canvasDblClicked = false;
                                        return
                                    }
                                    canvasDblClicked = false;
                                    drawShapeClick(event);
                                }, 400);
                            }
                            else if (event.detail === 2) {
                                canvasDblClicked = true;
                            }
                        }} >

                        {
                            canvasData.map(
                                (data) => {
                                    k = k + 1;
                                    return (
                                        <Shape 
                                            key={k}
                                            id={data.id}
                                            x={data.x}
                                            y={data.y}
                                            shape={data.shape}
                                            allShapes={canvasData}
                                            setShapes={setCanvasData}
                                        />
                                        )
                                    }
                                    )
                                }
                    </div>
                    <div className="counter">
                        <div className="imageCounterDivContainer">
                            <img src={require("../Images/circle.png")} alt="circle" />
                            <label className="counterImageLabel">{countShapeInCanvas("circle")}</label>
                        </div>
                        <div className="imageCounterDivContainer">
                            <img src={require("../Images/square.png")} alt="square" />
                            <label className="counterImageLabel">{countShapeInCanvas("square")}</label>
                        </div>
                        <div className="imageCounterDivContainer">
                            <img src={require("../Images/triangle.png")} alt="triangle" />
                            <label className="counterImageLabel">{countShapeInCanvas("triangle")}</label>
                        </div>
                    </div>
                </div>
                <div className="tools">
                    <center>
                        <p>Tools</p>
                    </center>
                    {
                        shapes.map(
                            (shapeName) => {
                                const pic = require("../Images/" + shapeName + ".png");
                                // setImgK(imgK + 1);
                                imgK = imgK + 1;
                                return (
                                    <center key={imgK} className="imageToolDivContainer">
                                        <img src={pic} alt={shapeName + " wasn't loaded."} className="toolsImage"
                                            draggable = "true" onDragStart={() => {
                                                setWhichShape(shapeName);
                                            }}
                                            onClick={() => {
                                                setWhichShape(shapeName);
                                            }}
                                        />
                                    </center>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}