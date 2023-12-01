import { defineStore } from 'pinia';
import { UI_Clickables } from '../assets/data/ui_clickables';
import { ibtFlowMobile, ibtFlowWeb } from '../assets/data/ibt_flow';

export const useAppStore = defineStore("app-store", {
    persist: true, 
    state: () => ({
        _init: false,

        /**
         * Consent Form 
         */
        consentForm : {
            age: 18, 
            gender: "male", 
            course: "", 
            year: 1
        }, 

        /** 
         * Mode
         */
        mode: "mobile", 

        /** 
         * Issues-Based Testing
         */
        ibt: {
            currentPageIndex: 0,
            pages: {
                web: {}, 
                mobile: {}
            }
        }
    }),
    getters: {
        getConsentFormInputs(state) {
            return state.consentForm;
        }, 
        getMode(state) {
            return state.mode;
        }
    },
    actions: {
        init() {
            this._init = true;

            if(localStorage.getItem("app-store") != null)   
                return; 

            /** 
             *  Set Up IBT
             */
            for(let pageName in ibtFlowWeb) {
                let context = this.ibt.pages.web; 
                context[pageName] = {
                    ratings : {
                        understandability: 3,
                        intuiveness: 3
                    },
                    qai : {
                        questions: "", 
                        issues: ""
                    }
                } 
            }

            for(let pageName in ibtFlowMobile) {
                let context = this.ibt.pages.mobile; 
                context[pageName] = {
                    ratings : {
                        understandability: 4,
                        intuiveness: 4
                    }, 
                    qaf :  {
                        questions: "", 
                        issues: ""
                    }
                } 
            }
        },

        // Consent Form
        setConsentFormAge(age) {    
            this.consentForm.age = age; 
        },
        setConsentFormGender(gender) {
            this.consentForm.gender = gender; 
        }, 
        setConsentFormCourse(course) {
            this.consentForm.course = course;
        },
        setConsentFormYear(year) {
            this.consentForm.year = year; 
        }, 

        // Mode
        setMode(mode) {
            this.consentForm.mode = mode; 
        }, 

        // IBT 
        gotoNextIBTPage() {
            this.ibt.currentPageIndex += 1;
        }, 
        getCurrentPageName() {
            return (
                Object.keys(UI_Clickables[this.mode])[this.ibt.currentPageIndex]
            );
        }
       
    }
});
