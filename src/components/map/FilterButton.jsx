export default function FilterButton({text, checked, onFilterChange, enabled = true}) {
    if (enabled) {
        return (
            <label className="inline-flex items-center bg-white/80 px-3 py-2 rounded-md shadow-sm">
                <input
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                    type="checkbox"
                    checked={checked}
                    onChange={() => onFilterChange()}
                />
                <span className="ml-2 text-sm">{text}</span>
            </label>
        )
    } else {
        return (
            <label className="inline-flex items-center bg-white/50 px-3 py-2 rounded-md shadow-sm cursor-not-allowed">
                <input
                    className="h-4 w-4 text-gray-400 rounded border-gray-300"
                    type="checkbox"
                    disabled
                />
                <span className="ml-2 text-sm text-gray-400">{text}</span>
            </label>
        )
    }
}