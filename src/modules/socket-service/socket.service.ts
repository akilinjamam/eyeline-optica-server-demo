import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

class SocketService {
	private _io: SocketServer | null = null;
	private _liveUsers: number = 0;

	public init(httpServer: HttpServer) {
		this._io = new SocketServer(httpServer, {
			cors: {
				origin: [
					"https://eyelineoptica.com",
					"https://www.eyelineoptica.com",
					"https://cms.eyelineoptica.com",
					"http://localhost:3000",
					"http://localhost:5173",
				],
				methods: ["GET", "POST"],
			},
		});

		this.handleEvents();
		return this._io;
	}

	private handleEvents() {
		if (!this._io) return;

		this._io.on("connection", (socket) => {
			this._liveUsers++;
			this.broadcastCount();

			socket.on("disconnect", () => {
				this._liveUsers = Math.max(0, this._liveUsers - 1);
				this.broadcastCount();
			});
		});
	}

	private broadcastCount() {
		this._io?.emit("LIVE_USER_COUNT", this._liveUsers);
	}

	// Getter if you need to access io elsewhere in your modules
	public get io() {
		return this._io;
	}
}

export const socketService = new SocketService();
