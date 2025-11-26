import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import config from "../../app/config";

type AgoraRole = "publisher" | "subscriber";

interface IAgoraPayload {
	channelName: string;
	uid: string;
	role: AgoraRole;
}

const createAgoraTokenService = async (payload: IAgoraPayload) => {
	const { channelName, uid, role } = payload;

	// use OR - throw if any required param is missing
	if (!channelName || !uid || !role) throw new AppError(StatusCodes.BAD_REQUEST, "Missing Params");

	const appId = config.agora_app_id as string;
	const appCertificate = config.agora_app_certificate as string;

	// 1 hour
	const expirationTimeInSec = 3600;
	const currentTimeStamp = Math.floor(Date.now() / 1000);
	const privilegeExpTs = currentTimeStamp + expirationTimeInSec;

	const rtcRole = role === "publisher" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

	// build token for string user-account (use buildTokenWithAccount)
	const token = RtcTokenBuilder.buildTokenWithAccount(
		appId,
		appCertificate,
		channelName,
		uid, // account (string)
		rtcRole,
		privilegeExpTs
	);

	return {
		token,
		appId,
	};
};

export const agoraTokenService = {
	createAgoraTokenService,
};
