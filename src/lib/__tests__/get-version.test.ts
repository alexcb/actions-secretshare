import {getVersionObject} from "../get-version";
import * as semver from 'semver';

// The latest version since this test was last changed
// Feel free to update it if secretshare has been updated
const latest = '0.0.4';

describe("get-version", () => {
    describe('latest range versions', () => {
        it.each(["*", "^0", "0.*.*"] as const)("should match %s versions", async (ver) => {
            const v = await getVersionObject(ver, false);
            expect(semver.gte(v.tag_name, latest));
        });
    });
});
