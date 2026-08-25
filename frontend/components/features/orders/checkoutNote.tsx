"use client";

interface Props {
    note: string;
    onNoteChange: (note: string) => void;
}

export default function CheckoutNote({ note, onNoteChange }: Props) {
    return (
        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shrink-0">3</div>
                <h2 className="text-sm font-semibold text-text dark:text-dark-text">
                    Order note <span className="text-text-secondary dark:text-dark-text-secondary font-normal">(optional)</span>
                </h2>
            </div>
            <textarea
                value={note}
                onChange={(e) => onNoteChange(e.target.value)}
                placeholder="Any special instructions for your order..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary resize-none placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary"
            />
        </div>
    );
}