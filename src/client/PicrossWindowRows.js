import React, { useEffect, useReducer, useState, useRef } from "react";

const Rows = (props) => {
  // const [initialized, setInitialized] = useState(false);
  const [className, setClass] = useState({});
  const { meta, handleClick, selectedCell } = props;
  const cellHistory = meta.history;
  const didMountRef = useRef(false);

  const initializeCells = () => {
    console.log("Initializing cells...");
    console.log(cellHistory);
    let flattened = cellHistory.reduce((accum, entry) => {
      accum[entry.cell] = entry.correct ? "cell correct" : "cell wrong";
      return accum;
    }, {});
    setClass((prevState) => ({ ...prevState, ...flattened }));
  };

  useEffect(() => initializeCells(), []);

  useEffect(() => {
    console.log("The classes are..");

    console.log(className);
  }, className);

  useEffect(() => {
    if (didMountRef.current) {
      let cid = selectedCell.cellID;
      let cellClass = selectedCell.correctClick ? "cell correct" : "cell wrong";
      console.log(cid);
      let obj = {};
      obj[cid] = cellClass;
      setClass((prevState) => ({ ...prevState, ...obj }));

      console.log(className);
    }
    didMountRef.current = true;
  }, [selectedCell]);

  let rows = [];
  let num = meta.i_width * -1;
  for (var i = -1; i < meta.i_height; i++) {
    let rowID = `row${i}`;
    let cell = [];
    for (var idx = 0; idx < meta.i_width; idx++) {
      let cellID = `${num}`;
      cell.push(
        <td
          key={cellID}
          id={cellID}
          className={className[cellID] ? className[cellID] : "cell"}
          onClick={!className[cellID] ? (e) => handleClick(e.target.id) : null}
        >
          &nbsp;
        </td>
      );
      num++;
    }
    rows.push(
      i === -1 ? (
        <tr key={i} id={rowID}>
          <td>&nbsp;</td>
          {meta.a_columns.map((col) => (
            <th style={{ verticalAlign: "bottom" }}>
              {col.map((val) => (
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  {val}
                </span>
              ))}
            </th>
          ))}
        </tr>
      ) : (
        <tr key={i} id={rowID}>
          <th style={{ textAlign: "right", paddingRight: "0.5em" }}>
            {meta.a_rows[i].map((row) => (
              <span style={{ paddingLeft: "0.25em" }}>{row}</span>
            ))}
          </th>

          {cell}
        </tr>
      )
    );
  }

  return rows;
};

export default Rows;
