		Node.js
		1. What is Node.js?
		Definition:
			Node.js is an open-source, cross-platform, JavaScript runtime environment that allows developers to execute JavaScript code outside a web browser. It uses the V8 JavaScript engine (developed by Google for Chrome) to compile and run JavaScript code efficiently.
		In essence:
			Node.js enables developers to build scalable network applications using JavaScript on the server side.
		Key Concept:
			● Before Node.js, JavaScript was used mainly for client-side scripting in web browsers.
			● With Node.js, JavaScript can now be used for server-side development, enabling full-stack
				JavaScript applications.
		2. History of Node.js
		Timeline and Evolution:
 
		        Year	                                                        Event
		2009	Node.js was created by Ryan Dahl and initially released as an open-source
			project.
		2010	The npm (Node Package Manager) was introduced, revolutionizing JavaScript
			dependency management.
		2011–2012	Node.js gained rapid popularity for real-time applications like chat and
			streaming.
		2014	io.js forked from Node.js due to governance issues, but later merged back in
			2015 under the Node.js Foundation.
		2015–Present	Node.js evolved into a stable platform with asynchronous I/O, event-driven
			architecture, and cross-platform support.
		Motivation Behind Node.js:
			Ryan Dahl’s main goal was to create a non-blocking, event-driven system that handled multiple simultaneous connections efficiently — something that traditional web servers like Apache struggled with.
		3. Features and Advantages of Node.js
		Core Features:
			1. Asynchronous and Event-Driven
				○ Node.js uses a non-blocking I/O model, which allows multiple operations to run
					concurrently.
				○ This improves performance, especially for data-intensive real-time applications.
			2. Single-Threaded Architecture
				○ Uses a single-threaded event loop that handles concurrent requests efficiently
					without creating multiple threads.
			3. Built on the V8 Engine
				       ○ Node.js executes JavaScript using Google Chrome’s V8 engine, offering high
					performance and fast execution speed.
 			○ Node.js can run on Windows, macOS, and Linux, allowing for versatile deployment.
			5. NPM (Node Package Manager)( Secret Ingredient behind success/popularity)
				○ Comes bundled with Node.js, providing access to a massive ecosystem of open-source
					libraries and modules.
			6. Scalable and Lightweight
				○ The event-driven model allows applications to scale easily with minimal resource
					usage.
			7. Full-Stack JavaScript
				○ Enables developers to use JavaScript on both the client and server side,
					simplifying development and reducing context switching.
			8. Active Open-Source Community
				○ Backed by a large community that continuously contributes to its development and
					library ecosystem.
           Advantages of Node.js:
			 
			                Advantage	                                        Description
			High Performance	Executes JavaScript directly in the V8 engine, making it fast
				and efficient.
			Real-Time Application	Ideal for chat applications, streaming services, and
			Support	collaborative tools.
			Easy Scalability	Uses event loops and clustering to handle thousands of
				concurrent connections.
			Code Reusability	Single language (JavaScript) used throughout front-end and
				back-end.
			Rich Ecosystem	npm provides access to thousands of reusable packages.
			Rapid Development	Easy to set up and deploy, supporting modern frameworks like
				Express.js and NestJS.
			JSON Friendly	Perfect for data exchange with APIs that use JSON format.
																					
		4. Installing Node.js
		Step-by-Step Installation Process
		A. Installation on Windows and macOS:
			1. Visit the official Node.js website: https://nodejs.org 
			2. Download the LTS (Long-Term Support) version for stability.
			3. Run the installer and follow the setup wizard.
		After installation, verify the setup using:
		node -v
		npm -v
			4. This displays the installed Node.js and npm versions.
		B. Installation on Linux (via terminal):
		sudo apt update For updating the File System
		(sudo stands for Super user Do) It is similar to Run As Admin in Window
		sudo apt install nodejs (nodejs Installation)
		sudo apt install npm (npm installation)
		Verify installation:
		node -v
		npm -v
		C. Using Node Version Manager (nvm):
			Node Version Manager allows managing multiple Node.js versions:
		nvm install 20
		nvm use 20
		5. Understanding npm (Node Package Manager)
		Definition:
			npm stands for Node Package Manager and is the default package manager for Node.js. It allows
		developers to install, manage, and share reusable JavaScript packages (libraries, modules, or
		tools).
		Purpose:
			● Simplifies dependency management.
			● Provides access to over a million open-source packages through the npm registry.
		Common npm Commands
		 
		                Command	                                        Description
		npm init	Initializes a new Node.js project and creates a package.json
			file.
		npm install <package>	Installs a package locally to the project.
		npm install -g <package>	Installs a package globally on the system.
		npm uninstall <package>	Removes a package.
		npm update	Updates all installed packages.
		npm list	Displays all installed dependencies.
		npm run <script>	Runs a custom script defined in package.json.

		Difference between Npm & Npx
		The fundamental difference is that npm is a package manager used for installing and managing project dependencies, while npx is a package runner used to execute Node.js packages directly without requiring permanent installation. 
		npm (Node Package Manager)
		NPM is the default package manager for Node.js and is automatically installed with Node.js. 
		○ Function: Manages, installs, updates, and removes project dependencies (packages).
		○ Installation: Packages are installed locally in the ./node_modules folder of your project or globally on your system using npm install <package-name>.
		○ Usage: It is used for long-term project dependencies that your application relies on, tracked in the package.json file.
		○ Execution: To run a locally installed package's executable with npm, you typically define a script in package.json or use the full path ./node_modules/.bin/<command-name>. 
		npx (Node Package Execute)
		NPX is a command-line tool bundled with npm versions 5.2.0 and above. 
		○ Function: Executes package binaries directly from the npm registry or a local cache without formal installation.
		○ Installation: It automatically downloads a package to a temporary cache, runs the command, and removes the temporary files (unless already cached).
		○ Usage: It is ideal for one-off commands, like project initializers (npx create-react-app), running experimental tools, or executing commands where you don't want to clutter your global environment or project dependencies.
		○ Execution: You simply run the command directly: npx <package-name>. 
		Summary of Differences
		Feature 	npm (Node Package Manager)	npx (Node Package Execute)
		Primary Purpose	Package management (install, update, remove dependencies).	Package execution (runs packages without installing them permanently).
		Installation	Requires explicit installation of packages locally or globally.	Automatically downloads and runs the package on-the-fly if not available locally.
		Persistence	Packages are saved in node_modules and tracked in package.json.	Packages are temporary and not saved as a project dependency.
		Use Case	Project dependencies, frequently used tools, automated scripts.	One-off commands, experimenting, running project scaffolding tools.
		Command Syntax	npm install <package>	npx <package>


		Understanding package.json
		package.json is the metadata file that defines a Node.js project’s dependencies, scripts, and
		configuration.
		Example:
		{
			"name": "my-node-app",
			"version": "1.0.0",
			"description": "A simple Node.js application",
			"main": "index.js",
			"scripts": {
			"start": "node index.js"
			},
			"dependencies": {
			"express": "^4.18.2"
		}
		Key Fields:
			● name: Project name.
			● version: Current version of the project.
			● main: Entry point file.
			● scripts: Custom commands.
			● dependencies: Libraries required to run the app.
			● devDependencies: Packages used only during development.
		6. Creating a Simple Node.js Application
		Step 1: Initialize a New Project
						
		mkdir my-node-app
		cd my-node-app
		npm init -y ( for creating nodejs app)
		This command creates a new folder and initializes it with a package.json file.
		Step 2: Create an Entry File
		Create a file named app.js (or index.js):
		// app.js
		console.log("Hello from Node.js!");
		Run the file:
		Output:
		Hello from Node.js!
		Step 3: Create a Simple Web Server Using HTTP Module
		// server.js
		const http = require('http');
		// Create an HTTP server
		const server = http.createServer((req, res) => {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Welcome to Node.js Server!');
});
		// Start the server on port 3000
		server.listen(3000, () => {
			console.log('Server running at http://localhost:3000');
		});
		Explanation:
			● The http module creates a simple server.
			● The server listens on port 3000.
			● When accessed via browser or API client, it displays "Welcome to Node.js Server!".
		Step 4: Run the Server

		Visit: http://localhost:3000
		You should see:
		Welcome to Node.js Server!
