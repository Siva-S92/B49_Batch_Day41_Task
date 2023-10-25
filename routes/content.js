import express from "express";
import { deletedContent, getAllContent, getUserContent, postNewContent, updatedContent } from "../controllers/content.js";

const router = express.Router();

// get all notes
router.get("/all", async (req, res) => {
    try {
        const notes = await getAllContent();
        if (!notes || notes.length <= 0) {
            return res.status(404).json({
                error: "No Content Available"
            });
        }
        res.status(200).json({
            data: notes,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// get all individual user's notes
router.get("/user/all", async (req, res) => {
    try {
        const notes = await getUserContent(req);
        if (!notes || notes.length <= 0) {
            return res.status(404).json({
                error: "No Content Available"
            });
        }
        res.status(200).json({
            data: notes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add new user's notes
router.post("/user/add", async (req, res) => {
    try {
        const newpost = await postNewContent(req);
        if (!newpost) {
            return res.status(400).json({
                error: "Error Occured While Uploading",
            })
        }
        res.status(201).json({
            message: "Successfully Uploaded",
            data: newpost,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Edit new user's notes
router.put("/user/edit/:id", async (req, res) => {
    try {
        const editedNotes = await updatedContent(req);
        if(!updatedContent){
            return res.status(400).json({
                error: "Error Occured While Updating",
            })
        }
        res.status(200).json({
            message: "Successfully Updated",
            data: editedNotes,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete new user's notes
router.delete("/user/delete/:id", async (req, res) => {
    try {
        const deleteNotes = await deletedContent(req);
        if(!deleteNotes){
            return res.status(400).json({
                error: "Error Occured While Deleting",
            })
        }
        res.status(200).json({
            message: "Successfully Deleted",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export const contentRouter = router;