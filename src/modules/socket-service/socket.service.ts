import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

export interface INewOrderPayload {
	invoiceNo: string;
	customer_name: string;
	payableAmount: number;
	saleType: string;
	createdAt?: Date | string;
}

class SocketService {
	private _io: SocketServer | null = null;
	private _liveUsers: number = 0;

	public init(httpServer: HttpServer) {
		this._io = new SocketServer(httpServer, {
			cors: {
				origin: [
					"https://eyelineoptica.com",
					"http://eyelineoptica.com",
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

	public broadcastNewOrder(orderData: INewOrderPayload): void {
		this._io?.emit("new_order_notification", orderData);
		console.log("triggered");
	}

	// Getter if you need to access io elsewhere in your modules
	public get io() {
		return this._io;
	}
}

export const socketService = new SocketService();
