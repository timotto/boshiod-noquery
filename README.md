# Bosh.io/d no-query-params Redirector

This is a redirector for use in between the `https://bosh.io/d/` redirector and 
[JFrog Artifactory](https://jfrog.com/artifactory/) allowing to specify the version as first path element.

## Motivation

Downloads from `https://bosh.io/d/` have the version number specified as query parameter `v=((version))`. JFrog 
Artifactory generic remote repositories support
[propagation of query parameters](https://www.jfrog.com/confluence/display/RTF/Advanced+Settings#AdvancedSettings-OtherSettings),
but ultimately fail to distinguish downloads of different query parameters, serving the first hit of a base url for all
subsequent requests no matter what query parameters are supplied by the client.

## Example

Given this redirector is configured with the defaults `PORT=8080` and `BASE_URL=https://bosh.io/d/` running on 
`localhost`, a request to `http://localhost:8080/v=123/some/artifact` results in a redirect to 
`https://bosh.io/d/some/artifact?v=123`.