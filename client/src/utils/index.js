import {surpriseMePrompts} from '../constants';
import FileSaver from 'file-saver';

export function getRandomPrompts(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt===prompt) return getRandomPrompts(prompt);

    return randomPrompt;
}

export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, 'download-${_id}.jpg');
}