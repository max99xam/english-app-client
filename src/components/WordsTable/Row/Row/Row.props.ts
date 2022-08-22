import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IWord } from "libs/types/types";

export interface RowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rowData: IWord;
    rowId: number;
}