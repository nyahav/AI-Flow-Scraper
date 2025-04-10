/*
  Warnings:

  - You are about to drop the column `creditsCost` on the `executionPhase` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_executionPhase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "node" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" DATETIME,
    "completeAt" DATETIME,
    "inputs" TEXT,
    "outputs" TEXT,
    "creditsConsume" INTEGER,
    "workflowExecutionId" TEXT NOT NULL,
    CONSTRAINT "executionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "WorkFlowExecution" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_executionPhase" ("completeAt", "id", "inputs", "name", "node", "number", "outputs", "startedAt", "status", "userId", "workflowExecutionId") SELECT "completeAt", "id", "inputs", "name", "node", "number", "outputs", "startedAt", "status", "userId", "workflowExecutionId" FROM "executionPhase";
DROP TABLE "executionPhase";
ALTER TABLE "new_executionPhase" RENAME TO "executionPhase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
