import { verifyProps } from "#/utils/HelperFunctions";

export const Scheduled = superclass =>
    class extends superclass {
        constructor(config) {
            super(config)
            verifyProps(this, ['act'])
        }
    }