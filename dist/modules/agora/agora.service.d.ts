interface IAgoraPayload {
    channelName: string;
    uid: string;
    role: string;
}
export declare const agoraTokenService: {
    createAgoraTokenService: (payload: IAgoraPayload) => Promise<{
        token: string;
        appId: string | undefined;
    }>;
};
export {};
//# sourceMappingURL=agora.service.d.ts.map