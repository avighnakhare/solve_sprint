CREATE UNIQUE INDEX "Award_challengeId_teamId_awardType_key"
ON "Award"("challengeId", "teamId", "awardType");
