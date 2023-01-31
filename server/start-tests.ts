import { getStorage, IStorage } from "@lib/core/storage";
import { createRun, finishRun } from "@lib/core/run";
import runBrowser from "@lib/core/browser";
import { EnumProject } from "@lib/core/enums";

const getTestIds = (req, res): number[] => {
    try {
        const testIds = req.query.testIds && JSON.parse(req.query.testIds);
        if (!testIds) {
            return null;
        }

        if (typeof testIds !== "object" || !testIds.length) {
            res.status(500).json({ error: "testIds is invalid" });
            return null;
        }

        return testIds;
    } catch (e) {
        res.status(500).json({ error: "testIds is invalid" });
        return null;
    }
}

export const exportTests = () => {
    function importAll(r) {
        return r.keys().map(r);
    }
    importAll(require.context("../tests", true, /\.(test.ts)$/));
}

export const startTests = (app) => {
    app.get("/start", async (req, res) => {
        const project: EnumProject = req.query.project;
        const testIds = getTestIds(req, res);
        const storage = getStorage();
        let startStorage: IStorage = [];
        res.json({});

        if (testIds) {
            storage.filter(test => test.props.project?.toLowerCase() == project?.toLowerCase()).map(test => {
                if (testIds.includes(test.props.id)) {
                    startStorage.push(test);
                }
            });
        } else {
            startStorage = storage.filter(test => test.props.project?.toLowerCase() == project?.toLowerCase());
        }

        if (startStorage.length > 0) {
            const runId = await createRun({ project, testIds });
            const { browser, page } = await runBrowser();
            for (const test of startStorage) {
                try {
                    console.log("Run test", test.props);
                    await test.fn({ runId, project, browser, page });
                } catch (error) {
                    console.log("Error from test", test.props);
                }
            }

            await browser.close();
            await finishRun({ project, runId });
        }
    });
}
