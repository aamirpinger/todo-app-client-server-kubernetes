import React from 'react';
import { MDBBtn, MDBIcon, MDBTooltip } from 'mdbreact';


export const fillTodoRows = (todoRecords, handleImportant, handleDone, deleteTodo) => {
    const todos = todoRecords.map((rec, index) => {
        return {
            id: index + 1,
            title: rec.title,
            description: rec.description,
            important: <div className="todoRow">
                <MDBTooltip
                    placement="top"
                >
                    <MDBBtn tag="a" floating className="round-btn" onClick={() => handleImportant(index, rec._id)} >
                        <MDBIcon icon="star" className={(rec.important) ? "filled-yellow" : ""} />
                    </MDBBtn>
                    <div>Mark Important</div>
                </MDBTooltip>
            </div>,
            done: <div className="todoRow">
                <MDBTooltip
                    placement="top"
                >
                    <MDBBtn tag="a" floating className="round-btn" onClick={() => handleDone(index, rec._id)} >
                        <MDBIcon icon="check" className={(rec.done) ? "filled-yellow" : ""} />
                    </MDBBtn>
                    <div>Done</div>
                </MDBTooltip>
            </div>
            ,
            delete: <div className="todoRow">
                <MDBTooltip
                    placement="top"
                >
                    <MDBBtn tag="a" floating className="round-btn" onClick={() => deleteTodo(index, rec._id)} >
                        <MDBIcon icon="trash-alt" />
                    </MDBBtn>
                    <div>Remove</div>
                </MDBTooltip>
            </div>
        }
    })
    return todos
}