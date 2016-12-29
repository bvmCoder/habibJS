const superagent = require("superagent");

export default class FusionApi {
    static getOrganizationsHighlighted(searchText, pageNumber, pageSize) {
        return new Promise((resolve) => {
            const url = 'http://ftc-lbeagfus301:8764/api/apollo/query-pipelines/qs_organizations/collections/organization/select?q=(' + searchText + ')&start=' + pageNumber + '&rows=' + pageSize + '&&fl=org_id,issr_nam,ticker&wt=json&omitHeader=true&hl=true';
            const $results = [];
            superagent
                .get(url)
                .set('Authorization', 'Basic YXBpdXNlcjpFYWcxM15tZGM=')
                .end((err, res) => {
                    const obj = JSON.parse(res.text).highlighting;
                    const objProperties = Object.getOwnPropertyNames(obj);
                    objProperties.forEach((prop) => {
                        if (obj[prop].issr_nam && obj[prop].issr_nam.length > 0) {
                            $results.push({ name: obj[prop].issr_nam[0] });
                        }
                    });
                    resolve($results);
                });
        });
    }
    static getOrganizations(searchText, pageNumber, pageSize) {
        return new Promise((resolve) => {
            const url = 'http://ftc-lbeagfus301:8764/api/apollo/query-pipelines/qs_organizations/collections/organization/select?q=(' + searchText + ')&start=' + pageNumber + '&rows=' + pageSize + '&&fl=org_id,issr_nam,ticker&wt=json&omitHeader=true&hl=false';
            superagent
                .get(url)
                .set('Authorization', 'Basic YXBpdXNlcjpFYWcxM15tZGM=')
                .end((err, res) => {
                    const documents = JSON.parse(res.text).response.docs || [];
                    const $results = documents.map((doc) => {
                        return { id: doc.org_id, name: doc.issr_nam };
                    });
                    resolve($results);
                });
        });
    }
    static getOrganizationsSvc(searchText, pageNumber, pageSize) {
        return new Promise((resolve) => {
            const skip = pageNumber * pageSize;
            const url = `http://ftc-wbcpsweb201:9000/v1/organizations?searchText=${searchText}&showRecords=False&showFacets=False&skip=${skip}&take=${pageSize}`;
            superagent
                .get(url)
                .end((err, res) => {
                    resolve(JSON.parse(res.text).Organizations);
                });
        });
    }
}
