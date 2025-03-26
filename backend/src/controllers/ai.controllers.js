const aiService = require("../services/ai.services");

module.exports.getResponse = async (req, res) => {
    try {
        const code = req.body.code;

        if (!code) {
            return res.status(400).json({ error: "Code input is required" });
        }

        const response = await aiService.getResponse(code);  // ✅ Corrected function call
        res.json({ review: response });  // ✅ Return JSON properly
    } catch (error) {
        console.error("Error processing AI response:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
