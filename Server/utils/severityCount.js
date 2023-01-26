const severityCountFunction = async (
    bugIssues,
    vulnerabilityIssues,
    codeSmellIssues
) => {
    const bugBlocker = bugIssues.filter(
        (issue) => issue.severity === 'BLOCKER'
    ).length;
    const bugCritical = bugIssues.filter(
        (issue) => issue.severity === 'CRITICAL'
    ).length;
    const bugMajor = bugIssues.filter(
        (issue) => issue.severity === 'MAJOR'
    ).length;
    const bugMinor = bugIssues.filter(
        (issue) => issue.severity === 'MINOR'
    ).length;
    const bugInfo = bugIssues.filter(
        (issue) => issue.severity === 'INFO'
    ).length;

    const vulnerabilityBlocker = vulnerabilityIssues.filter(
        (issue) => issue.severity === 'BLOCKER'
    ).length;
    const vulnerabilityCritical = vulnerabilityIssues.filter(
        (issue) => issue.severity === 'CRITICAL'
    ).length;
    const vulnerabilityMajor = vulnerabilityIssues.filter(
        (issue) => issue.severity === 'MAJOR'
    ).length;
    const vulnerabilityMinor = vulnerabilityIssues.filter(
        (issue) => issue.severity === 'MINOR'
    ).length;
    const vulnerabilityInfo = vulnerabilityIssues.filter(
        (issue) => issue.severity === 'INFO'
    ).length;

    const codeSmellBlocker = codeSmellIssues.filter(
        (issue) => issue.severity === 'BLOCKER'
    ).length;
    const codeSmellCritical = codeSmellIssues.filter(
        (issue) => issue.severity === 'CRITICAL'
    ).length;
    const codeSmellMajor = codeSmellIssues.filter(
        (issue) => issue.severity === 'MAJOR'
    ).length;
    const codeSmellMinor = codeSmellIssues.filter(
        (issue) => issue.severity === 'MINOR'
    ).length;
    const codeSmellInfo = codeSmellIssues.filter(
        (issue) => issue.severity === 'INFO'
    ).length;

    return {
        bugBlocker,
        bugCritical,
        bugMajor,
        bugMinor,
        bugInfo,
        vulnerabilityBlocker,
        vulnerabilityCritical,
        vulnerabilityMajor,
        vulnerabilityMinor,
        vulnerabilityInfo,
        codeSmellBlocker,
        codeSmellCritical,
        codeSmellMajor,
        codeSmellMinor,
        codeSmellInfo,
    };
};

module.exports = severityCountFunction;
