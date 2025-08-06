import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatNumber',
    standalone: true,
})
export class FormatNumber implements PipeTransform {
    transform(value: number | null | undefined): string | number {
        if (value === null || value === undefined) {
            return '';
        }

        if (Math.abs(value) < 1000) {
            return value; // No change for numbers less than 1000
        }

        const abbreviations = ['k', 'M', 'B', 'T'];
        const tier = (Math.log10(Math.abs(value)) / 3) | 0;

        if (tier === 0) return value;

        const suffix = abbreviations[tier - 1];
        const scale = Math.pow(10, tier * 3);
        const scaled = value / scale;

        // Return with one decimal place if it's not a whole number, and remove .0
        return scaled.toFixed(1).replace(/\.0$/, '') + suffix;
    }
}