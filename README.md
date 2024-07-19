# Interactive Music Saver (Concerto)

## Table of Contents
- [Introduction](#introduction)
  - [Features](#features)
  - [Architecture](#architecture)
- [Demo On AWS](#demo-on-aws)

## Introduction

Concerto is a full-stack web application built to help music lovers discover and keep track of their favorite music events. The application integrates with the Ticketmaster API to provide real-time information about music events happening in various cities.

### Features

- **Search for Concerts:** View concerts by searching cities within the U.S. sorted by current date and filtering out events that have invalid dates
- **Favorite Upcoming Concerts:** Concerts can be added to a favorites list by clicking the star next to the event which saves it to the backend API

### Architecture

- **Backend:** Django for handling API requests between frontend and Ticketmaster.
- **Frontend:** Create-React-App using Javascript for components/services and tailwindCSS for styling.
- **AWS:** S3 bucket for frontend and EC2 instance for backend

## Demo On AWS

An instance of the app is running on AWS if you do not wish to clone the repo and set up containers locally. Click the link 'Demo on AWS' to give it a go.

[Demo On AWS](http://concerto-frontend.s3-website.us-east-2.amazonaws.com/)
