import React from "react";

const cloneChildren = (
  children: React.ReactNode,
  newPropsCallback: (index: number) => {
    id: number;
    selected: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }
) =>
  React.Children.map(children, (child, i) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          ...child.props,
          ...newPropsCallback(i),
        })
      : child
  );

interface TabsProps extends React.HTMLAttributes<HTMLDivElement>{
  defaultIndex?: number;
}

export const Tabs = ({
  defaultIndex = 0,
  ...props
}: React.PropsWithChildren<TabsProps>) => {
  React.useEffect(() => {
    removeHiddenAttribute(`#tabpanel-${defaultIndex}`);
  }, [defaultIndex]);

  const removeHiddenAttribute = (selector: string) =>
    document.querySelector(selector)?.removeAttribute("hidden");

  return (
    <div role="tabs" {...props}>
      {cloneChildren(props.children, (index) => ({
        id: index,
        selected: index === defaultIndex,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          const currentTab = e.target as HTMLElement;
          const tabListNode = currentTab.parentNode;

          tabListNode
            ?.querySelectorAll('[aria-selected="true"]')
            .forEach((tab) => tab.setAttribute("aria-selected", "false"));
          currentTab.setAttribute("aria-selected", "true");
          document
            .querySelectorAll('[role="tabpanel"]')
            .forEach((panel) => panel.setAttribute("hidden", "true"));
          removeHiddenAttribute(`#${currentTab.getAttribute("aria-controls")}`);
        },
      }))}
    </div>
  );
};

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  (props: TabProps, ref) => (
    <button
      {...props}
      ref={ref}
      role="tab"
      aria-selected={props.selected}
      aria-controls={`tabpanel-${props.id}`}
    >
      {props.children}
    </button>
  )
);

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

export const TabPanel = ({ index, ...props }: TabPanelProps) => (
  <div hidden id={`tabpanel-${index}`} role="tabpanel" {...props}>
    {props.children}
  </div>
);
