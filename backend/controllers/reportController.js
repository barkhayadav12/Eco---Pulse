const Report = require("../models/Report");
const Team = require("../models/Team");

const createReport = async (req, res) => {
    try {
        const { location, latitude, longitude, wasteType, description } = req.body;
        const image = req.file.filename;
        const newReport = new Report({ location, latitude, longitude, wasteType, description, image });
        await newReport.save();
        res.status(201).json("Report created");
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getReports = async (req, res) => {
    const reports = await Report.find().populate('userId');
    res.json(reports);
};

const assignTeam = async (req, res) => {
    const { reportId, teamId } = req.body;

    const team = await Team.findById(teamId);
    const report = await Report.findById(reportId);

    if (!team || !report) return res.status(404).json({ message: 'Team or Report not found' });

    report.status = `Assigned to ${team.teamName} on ${new Date().toLocaleDateString()}`;
    report.assignedTeam = team._id;
    await report.save();

    team.status = 'Busy';
    await team.save();

    res.json({ message: 'Team assigned to Report' });
};

const completeTask = async (req, res) => {
    const { reportId, teamId } = req.body;

    const report = await Report.findById(reportId);
    const team = await Team.findById(teamId);

    if (!report || !team) return res.status(404).json({ message: 'Not found' });

    report.status = 'Completed';
    await report.save();

    team.status = 'Unassigned';
    await team.save();

    res.json({ message: 'Task marked as completed' });
};

module.exports = {
    createReport,
    getReports,
    assignTeam,
    completeTask,
};
