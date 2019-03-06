import { verifyProps } from "#/utils/HelperFunctions";

export const Item = superclass =>
    class extends superclass {
        constructor(config) {
            verifyProps(config, ['itemType'])
            super(config)
        }
    }