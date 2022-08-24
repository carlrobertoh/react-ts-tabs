import React from "react";
import "./styles.css";
interface TabsProps {
    defaultIndex?: number;
}
export declare const Tabs: ({ defaultIndex, ...props }: React.PropsWithChildren<TabsProps>) => JSX.Element;
interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
}
export declare const Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLButtonElement>>;
interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
}
export declare const TabPanel: ({ index, ...props }: TabPanelProps) => JSX.Element;
export {};
