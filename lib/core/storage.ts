import {Browser, Page} from "puppeteer";
import {EnumProject} from "@lib/core/enums";

interface FnProps {
    runId: number;
    project: EnumProject;
    browser: Browser;
    page: Page;
}

type ITest = {
    props: { id: number; name: string, project: EnumProject };
    fn: (props: FnProps) => void;
};

export type IStorage = ITest[];

const storage: IStorage = [];

export const getStorage = (): IStorage => storage;

export const addToStorage = (item: ITest) => {
    storage.push(item)
}
