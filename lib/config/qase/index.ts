import { EnumProject } from "@lib/core/enums";

const QaseConfig = {
    AUTH_KEY: process.env.AUTH_KEY || "",
    PROJECT: process.env.PROJECT || EnumProject.TEST,
}

export default QaseConfig
