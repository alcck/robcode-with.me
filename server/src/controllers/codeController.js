// Sandbox execution handler
exports.executeCode = async (req, res) => {
    try {
        const { code, language } = req.body;

        if (!code || !language) {
            return res.status(400).json({ message: 'Code and language are required.' });
        }

        // Lightweight demonstration runner for JavaScript
        if (language === 'javascript') {
            let outputLogs = [];
            
            // Capture console.log outputs during execution
            const customConsole = {
                log: (...args) => outputLogs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(' '))
            };

            try {
                // Isolate scope using Function constructor
                const runSandbox = new Function('console', `
                    try {
                        ${code}
                    } catch (error) {
                        console.log("Runtime Error: " + error.message);
                    }
                `);

                runSandbox(customConsole);

                return res.json({
                    success: true,
                    output: outputLogs.join('\n') || 'Code executed successfully with no console output.'
                });
            } catch (syntaxError) {
                return res.status(400).json({
                    success: false,
                    output: `Syntax Error: ${syntaxError.message}`
                });
            }
        } else {
            // Placeholder for Python or other compiled languages 
            // (Typically integrated via Docker or services like Judge0/JDoodle)
            return res.json({
                success: true,
                output: `[Simulated Execution] Successfully processed ${language} snippet.`
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};