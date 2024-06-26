import { useId } from "react";
import { Button, CheckBox, Events, Input, LineBreaks, Select } from "@/design";
import { cn } from "@/util";
import { SignUpLayoutProps } from "@/interface";

export default function SignUpDesign({
  titles,
  buttons,
  inputs,
  checkboxes,
  selects,
  widgets,
  children,
}: SignUpLayoutProps) {
  const { title, subtitle } = titles;
  const id = useId();
  const container = {
    sizes: "w-80",
    displays: "flex flex-col justify-center gap-5",
  };

  return (
    <Events.Show widgets={widgets?.shows}>
      <div className={cn(container)}>
        <LineBreaks
          texts={title}
          className="text-4xl font-bold leading-tight"
        />
        <LineBreaks texts={subtitle} className="text-gray-400" />
        {checkboxes?.map(({ flag, title, scripts }) => (
          <CheckBox key={id} title={title} script={scripts} flag={flag} />
        ))}
        {inputs?.map(({ type, title, state, placeholder }) => (
          <div className="flex w-full flex-col gap-2">
            {title && <div>{title}</div>}
            <Input state={state} placeholder={placeholder} type={type} />
          </div>
        ))}
        {selects?.map(({ title, state, selectOptions, placeholder }) => (
          <div className="flex w-full flex-col gap-2">
            {title && <div>{title}</div>}
            <Select
              state={state}
              selectOptions={selectOptions}
              placeholder={placeholder}
            />
          </div>
        ))}
        {children}
        {buttons?.map(([title, onClick]) => (
          <Button
            key={id}
            title={title}
            onClick={onClick}
            options={{
              size: "lg",
              color: "black",
            }}
          />
        ))}
      </div>
    </Events.Show>
  );
}
