
const Vote = require("../models/Vote");
const Participant = require("../models/Participant"); // voters
const Candidate = require("../models/Candidate");   // candidates

exports.castVote = async (req, res) => {
  const voterId = req.user.id; // from JWT
  const { candidateId } = req.body;

  try {
    // Find voter
    const voter = await Participant.findById(voterId);
    if (!voter) return res.status(404).json({ message: "Voter not found" });
    if (voter.hasVoted) return res.status(400).json({ message: "You have already voted" });

    //  Find candidate
    const candidate = await Candidate.findOne({ candidateId });
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    // Save vote with all required fields
    await Vote.create({
      voterId: voter._id,
      candidate: candidate.name,           // required field in Vote schema
      constituency: candidate.constituency // required field in Vote schema
    });

    //  Update candidate votes count
    candidate.votes += 1;
    await candidate.save();

    //  Mark voter as voted
    voter.hasVoted = true;
    await voter.save();

    res.status(200).json({ message: `Vote successfully cast for ${candidate.name}` });
  } catch (err) {
    console.error("Vote error:", err);
    res.status(500).json({ message: "Vote casting failed", error: err.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 }); // sorted by votes
    res.json(candidates );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};