import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drop: {
      backgroundColor: "#555",
      width: "250px",
      height: "50px",
      margin: "5px"
    },
    dropStack: {
      backgroundColor: "#555",
      width: "250px",
      height: "400px",
      margin: "32px"
    }
  })
);

interface DroppableProps {
  id: string;
  children?: JSX.Element | JSX.Element[];
}

export const Droppable: React.FC<DroppableProps> = ({
  id,
  children
}: DroppableProps) => {
  const classes = useStyles();
  const handleDrop = (e: any) => {
    e.preventDefault();
    const src = document.getElementById(e.dataTransfer.getData("transfer"));
    if (src) {
      var srcParent = src.parentNode;
      if (srcParent) {
        var tgt = e.currentTarget.firstElementChild;

        console.log(
          `type ${e.currentTarget.nodeType} src ${srcParent.nodeType} getAttribute ${e.currentTarget.className}
          srcParent ${src.className} - ${tgt}
          `
        );

        if (tgt) {
          console.log(`1`);
          e.currentTarget.replaceChild(src, tgt);

          srcParent.appendChild(tgt);
        } else {
          console.log(`2`);
          e.target.appendChild(src);
        }
      }
    }
  };

  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={classes.drop}
      id={id}
      onDrop={event => handleDrop(event)}
      onDragOver={handleAllowDrop}
    >
      {children}
    </div>
  );
};

export const DroppableStack: React.FC<DroppableProps> = ({
  id,
  children
}: DroppableProps) => {
  const classes = useStyles();
  const handleDrop = (e: any) => {
    e.preventDefault();
    const src = document.getElementById(e.dataTransfer.getData("transfer"));
    e.target.appendChild(src);
  };

  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={classes.dropStack}
      id={id}
      onDrop={handleDrop}
      onDragOver={handleAllowDrop}
    >
      {children}
    </div>
  );
};
