import { useState } from "react";

export function useToogleEye(
    initialValue: boolean = false,
): [boolean, () => void] {

    const [value, setValue] = useState(initialValue);
    const toogle = () => setValue(!value);
    return [value, toogle];
}
