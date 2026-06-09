import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectItem {
    id: string | number;
    name: string;
    [key: string]: any;
}

interface SearchableSelectProps {
    items: SelectItem[];
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    disabledPlaceholder?: string;
    disabled?: boolean;
    error?: string;
    ref?: React.Ref<HTMLButtonElement>;
}

export const SearchableSelect = ({
    items,
    value,
    onChange,
    placeholder = "Select option...",
    disabledPlaceholder = "Disabled",
    disabled = false,
    error,
    ref,
}: SearchableSelectProps) => {

    const safeItems = items || [];

    const selectedItem = safeItems.find(
        (item) => item.id.toString() === value
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    ref={ref}
                    type="button"
                    disabled={disabled}
                    className={`flex w-full items-center justify-between rounded-[0.625rem] border 
          ${error ? 'border-red-500' : 'border-[#e8d5c4]'} 
          bg-[#FFF9F5] px-4 py-3 text-sm text-gray-800 transition-all 
          focus:outline-none focus:border-[#c4956a] focus:ring-2 focus:ring-[#c4956a]/20 
          disabled:opacity-50 text-left max-[400px]:text-[13px]`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    {selectedItem
                        ? selectedItem.name
                        : (disabled ? disabledPlaceholder : placeholder)}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0 dynamic-popover-width" align="start">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {safeItems.map((item) => (
                                <CommandItem
                                    className="cursor-pointer"
                                    key={item.id}
                                    value={item.name}
                                    onSelect={() => {
                                        onChange(item.id.toString());
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4 cursor-pointer",
                                            value === item.id.toString() ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};