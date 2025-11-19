import { RtcTokenBuilder, RtcRole } from "agora-token";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import config from "../../app/config";

interface IAgoraPayload {
	channelName: string;
	uid: string;
	role: string;
}

const createAgoraTokenService = async (payload: IAgoraPayload) => {
	const { channelName, uid, role } = payload;

	if (!channelName && !uid && !role) throw new AppError(StatusCodes.NOT_FOUND, "Missing Params");

	const appId = config.agora_app_id;
	const appCertificate = config.agora_app_certificate;

	const expirationTimeInSec = 3600;
	const currentTimeStamp = Math.floor(Date.now() / 1000);
	const privilegeExpTs = currentTimeStamp + expirationTimeInSec;
	const tokenExp = currentTimeStamp + expirationTimeInSec;

	const token = RtcTokenBuilder.buildTokenWithUid(
		appId as string,
		appCertificate as string,
		channelName,
		uid,
		role === "publisher" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER,
		tokenExp,
		privilegeExpTs
	);

	return {
		token: token,
		appId: appId,
	};
};

export const agoraTokenService = {
	createAgoraTokenService,
};
