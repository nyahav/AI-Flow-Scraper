"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNode";
import React, { useId, useState } from "react";

function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
    const [intervalValue, setIntervalValue] = useState(value ?? "");
    const id = useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setIntervalValue(newValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        updateNodeParamValue(newValue);
    };

    return (
        <div className="space-y-1 p-1 w-full">
            <Label htmlFor={id} className="text-sm flex">
                {param.name}
                {param.required && <p className="text-red-400 px-2">*</p>}
            </Label>
            <Input
                id={id}
                className="text-xs"
                value={intervalValue}
                placeholder="Enter value here"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {param.helperText && (
                <p className="text-muted-foreground px-2">{param.helperText}</p>
            )}
        </div>
    );
}

export default StringParam;