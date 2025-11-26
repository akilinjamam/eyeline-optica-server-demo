type AgoraRole = "publisher" | "subscriber";
interface IAgoraPayload {
    channelName: string;
    uid: string;
    role: AgoraRole;
}
export declare const agoraTokenService: {
    createAgoraTokenService: (payload: IAgoraPayload) => Promise<{
        token: string;
        appId: string;
    }>;
};
export {};
//# sourceMappingURL=agora.service.d.ts.map