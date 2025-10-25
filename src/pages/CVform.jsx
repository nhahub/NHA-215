import React, { useReducer, useRef, useCallback, useState } from "react";

/* ---------- Accepted file MIME types ---------- */
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
];

/* ---------- Initial state & reducer (single store) ---------- */
const initialState = {
  values: {
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    education: "",
    experiences: [],
    skillInput: "",
    skills: [],
    cvFileName: "",
  },
  errors: {},
  loading: false,
  serverError: null,
  success: false,
  file: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case "ADD_EXPERIENCE":
      return {
        ...state,
        values: {
          ...state.values,
          experiences: [...state.values.experiences, action.exp],
        },
      };
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        values: {
          ...state.values,
          experiences: state.values.experiences.map((ex) =>
            ex.id === action.id ? { ...ex, [action.field]: action.value } : ex
          ),
        },
      };
    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        values: {
          ...state.values,
          experiences: state.values.experiences.filter(
            (ex) => ex.id !== action.id
          ),
        },
      };
    case "ADD_SKILL":
      if (!action.skill) return state;
      if (state.values.skills.includes(action.skill)) return state;
      return {
        ...state,
        values: {
          ...state.values,
          skills: [...state.values.skills, action.skill],
          skillInput: "",
        },
      };
    case "REMOVE_SKILL":
      return {
        ...state,
        values: {
          ...state.values,
          skills: state.values.skills.filter((s) => s !== action.skill),
        },
      };
    case "SET_FILE":
      return {
        ...state,
        file: action.file,
        values: { ...state.values, cvFileName: action.name },
        serverError: null,
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.loading, serverError: null };
    case "SET_SERVER_ERROR":
      return { ...state, serverError: action.error, loading: false };
    case "SET_SUCCESS":
      return { ...state, success: true, loading: false };
    default:
      return state;
  }
}

/* ---------- Simple validators ---------- */
function validate(values) {
  const errs = {};
  if (!values.fullName.trim()) errs.fullName = "Full name is required.";
  if (!values.email.trim()) errs.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email))
    errs.email = "Enter a valid email.";
  if (values.phone && !/^[\d +()-]{6,}$/.test(values.phone))
    errs.phone = "Enter a valid phone number.";
  if (!values.summary.trim())
    errs.summary = "A short summary helps recruiters.";
  return errs;
}

let expIdCounter = 1;

/* ---------- Component ---------- */
export default function CVFormUploader({ onSuccessRedirect }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { values, errors, loading, serverError, success, file } = state;

  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  /* ----------------- File handling (validate + set) ----------------- */
  const validateAndSet = useCallback((f) => {
    if (!f) return false;
    if (!ACCEPTED_TYPES.includes(f.type)) {
      dispatch({
        type: "SET_SERVER_ERROR",
        error: "Please upload a PDF, Word or PowerPoint file.",
      });
      dispatch({ type: "SET_FILE", file: null, name: "" });
      if (fileRef.current) fileRef.current.value = "";
      return false;
    }
    dispatch({ type: "SET_FILE", file: f, name: f.name });
    return true;
  }, []);

  const handleFiles = (files) => {
    const f = files && files[0];
    if (f) validateAndSet(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const onChoose = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const onFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const removeFile = () => {
    dispatch({ type: "SET_FILE", file: null, name: "" });
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ----------------- Form field handlers ----------------- */
  const handleChange = (e) =>
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });

  const handleAddExperience = () => {
    const newExp = {
      id: ++expIdCounter,
      title: "",
      company: "",
      from: "",
      to: "",
      description: "",
    };
    dispatch({ type: "ADD_EXPERIENCE", exp: newExp });
  };

  const handleExpChange = (id, field, value) =>
    dispatch({ type: "UPDATE_EXPERIENCE", id, field, value });

  const handleRemoveExperience = (id) =>
    dispatch({ type: "REMOVE_EXPERIENCE", id });

  const handleSkillKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const skill = values.skillInput.trim();
      if (skill) dispatch({ type: "ADD_SKILL", skill });
    }
  };

  const removeSkill = (s) => dispatch({ type: "REMOVE_SKILL", skill: s });

  /* ----------------- Submit ----------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length) {
      dispatch({ type: "SET_ERRORS", errors: errs });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    dispatch({ type: "SET_LOADING", loading: true });

    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("summary", values.summary);
      formData.append("education", values.education);
      formData.append("skills", JSON.stringify(values.skills));
      formData.append("experiences", JSON.stringify(values.experiences));
      if (fileRef.current && fileRef.current.files[0])
        formData.append("cv", fileRef.current.files[0]);

      const resp = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
      const data = await resp.json();

      if (!resp.ok) {
        dispatch({
          type: "SET_SERVER_ERROR",
          error: data.error || "Submission failed",
        });
        return;
      }

      dispatch({ type: "SET_SUCCESS" });
      if (onSuccessRedirect) onSuccessRedirect(data);
    } catch (err) {
      dispatch({
        type: "SET_SERVER_ERROR",
        error: "Network error. Try again.",
      });
    }
  };

  /* ----------------- Success UI ----------------- */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#020707] to-[#052a2a]">
        <div className="max-w-3xl w-full bg-[#071014] p-8 rounded-2xl shadow-lg border border-[#123d3d] text-white">
          <h2 className="text-2xl font-bold text-[#20bec4]">
            Submission received
          </h2>
          <p className="mt-2 text-gray-300">
            Thanks! We will analyze your CV and send job recommendations
            shortly.
          </p>
        </div>
      </div>
    );
  }

  /* ----------------- Main UI: upload bubble + form ----------------- */
  return (
    <div className="flex items-center justify-center p-6 bg-gradient-to-br from-[#010d0d] to-[#023437] text-white">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: big speech-bubble upload */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#bfeee9] to-[#c7f3ea] p-8 shadow-2xl border border-[#0c3c3a] flex flex-col items-center">
          <div className="flex flex-col items-center gap-3">
            {/* cloud icon */}
            <svg
              className="w-16 h-16 text-[#083433]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 16H7a4 4 0 010-8c.62 0 1.2.16 1.7.44A6 6 0 1120 16h-4z"
                stroke="#083433"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 10v4"
                stroke="#083433"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 13h6"
                stroke="#083433"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="text-2xl font-semibold text-[#083433]">
              Upload your resume
            </h2>
            <p className="text-sm text-[#083433]/90">
              Drag & drop your CV, or click Import file. Accepted: PDF, DOCX,
              PPTX.
            </p>

            {/* drop area */}
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={`mt-4 w-full max-w-2xl mx-auto rounded-lg border-2 p-8 flex flex-col items-center justify-center transition ${
                dragOver
                  ? "border-dashed border-[#0E898E] bg-[#e6f7f6]"
                  : "border-dashed border-[#5aa6a1] bg-[#effffdf0]"
              }`}
              style={{ minHeight: 180 }}
              aria-label="Drop your resume here"
            >
              <svg
                className="w-20 h-20 mb-2 text-[#0b3f3f]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                  stroke="#0b3f3f"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10h8"
                  stroke="#0b3f3f"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-[#0b3f3f] mb-1">
                Drag & drop to upload
              </p>
              <p className="text-xs text-[#0b3f3f] opacity-80">
                PDF, DOCX, PPTX
              </p>

              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,.pptx,.ppt"
                className="hidden"
                onChange={onFileChange}
              />

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={onChoose}
                  className="inline-flex items-center gap-2 bg-[#0ea6a9] hover:bg-[#0c8f90] text-white px-4 py-2 rounded-md shadow"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 21l-4.35-4.35"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 19a8 8 0 100-16 8 8 0 000 16z"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Import file
                </button>
                {file && (
                  <button
                    type="button"
                    onClick={removeFile}
                    className="inline-flex items-center gap-2 bg-transparent border border-[#0b3f3f] text-[#0b3f3f] px-3 py-2 rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="mt-4 w-full max-w-2xl text-center">
                {serverError && (
                  <p className="text-sm text-red-500">{serverError}</p>
                )}
                {file && (
                  <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-[#0b3f3f]">
                    <svg
                      className="w-5 h-5 text-[#0b3f3f]"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                        stroke="#0b3f3f"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="text-left">
                      <div className="text-sm font-medium">{file.name}</div>
                      <div className="text-xs text-[#0b3f3f]/70">
                        {(file.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* corner icon */}
          <div className="absolute top-6 right-6 bg-[#012726] p-2 rounded-lg border border-[#0b3f3f]">
            <svg
              className="w-8 h-8 text-[#0ea6a9]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 16v-8"
                stroke="#0ea6a9"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12h8"
                stroke="#0ea6a9"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Right: form (English labels + short instructions) */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f1414] p-6 rounded-2xl border border-[#123d3d] shadow-lg"
        >
          <h1 className="text-2xl font-bold text-[#20bec4] mb-2">
            Resume & Profile
          </h1>
          <p className="text-sm text-gray-400 mb-4">
            Fill in your details and upload your CV. We will analyze your
            profile and suggest jobs.
          </p>

          {/* basic fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-gray-300">Full Name</span>
              <input
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 rounded bg-[#0b0f0f] border ${
                  errors.fullName ? "border-red-500" : "border-[#174b4b]"
                } text-white`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">Email</span>
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 rounded bg-[#0b0f0f] border ${
                  errors.email ? "border-red-500" : "border-[#174b4b]"
                } text-white`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">Phone (optional)</span>
              <input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 rounded bg-[#0b0f0f] border ${
                  errors.phone ? "border-red-500" : "border-[#174b4b]"
                } text-white`}
              />
              {errors.phone && (
                <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">Top Education</span>
              <input
                name="education"
                value={values.education}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded bg-[#0b0f0f] border border-[#174b4b] text-white"
              />
            </label>
          </div>

          <label className="block mt-4">
            <span className="text-sm text-gray-300">Short summary</span>
            <textarea
              name="summary"
              value={values.summary}
              onChange={handleChange}
              rows="4"
              className={`mt-1 w-full px-3 py-2 rounded bg-[#0b0f0f] border ${
                errors.summary ? "border-red-500" : "border-[#174b4b]"
              } text-white`}
            />
            {errors.summary && (
              <p className="text-xs text-red-400 mt-1">{errors.summary}</p>
            )}
          </label>

          {/* Experiences */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-200">
                Experience
              </h4>
              <button
                type="button"
                onClick={handleAddExperience}
                className="text-sm text-[#20bec4] hover:underline"
              >
                Add experience +
              </button>
            </div>

            {values.experiences.length === 0 && (
              <p className="text-xs text-gray-400 mb-2">
                No experiences added yet
              </p>
            )}

            <div className="space-y-3">
              {values.experiences.map((ex) => (
                <div
                  key={ex.id}
                  className="p-3 rounded bg-[#071014] border border-[#123d3d]"
                >
                  {/* fixed responsive grid: title(2 col) | company | from | to */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    <input
                      placeholder="Job title"
                      value={ex.title}
                      onChange={(e) =>
                        handleExpChange(ex.id, "title", e.target.value)
                      }
                      className="md:col-span-2 w-full px-2 py-1 rounded bg-[#0b0f0f] border border-[#174b4b] text-white"
                    />
                    <input
                      placeholder="Company"
                      value={ex.company}
                      onChange={(e) =>
                        handleExpChange(ex.id, "company", e.target.value)
                      }
                      className="w-full px-2 py-1 rounded bg-[#0b0f0f] border border-[#174b4b] text-white"
                    />
                    <input
                      placeholder="From (year)"
                      value={ex.from}
                      onChange={(e) =>
                        handleExpChange(ex.id, "from", e.target.value)
                      }
                      className="w-full px-2 py-1 rounded bg-[#0b0f0f] border border-[#174b4b] text-white"
                    />
                    <input
                      placeholder="To"
                      value={ex.to}
                      onChange={(e) =>
                        handleExpChange(ex.id, "to", e.target.value)
                      }
                      className="w-full px-2 py-1 rounded bg-[#0b0f0f] border border-[#174b4b] text-white"
                    />
                  </div>

                  <textarea
                    placeholder="Short description"
                    value={ex.description}
                    onChange={(e) =>
                      handleExpChange(ex.id, "description", e.target.value)
                    }
                    className="mt-2 w-full px-2 py-1 rounded bg-[#0b0f0f] border border-[#174b4b] text-white"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(ex.id)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-4">
            <label className="block text-sm text-gray-300 mb-2">
              Skills (press Enter to add)
            </label>
            <div className="flex gap-2 items-center">
              <input
                name="skillInput"
                value={values.skillInput}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "skillInput",
                    value: e.target.value,
                  })
                }
                onKeyDown={handleSkillKey}
                placeholder="JavaScript, React, Node..."
                className="flex-1 px-3 py-2 rounded bg-[#0b0f0f] border border-[#174b4b] text-white"
              />
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "ADD_SKILL",
                    skill: values.skillInput.trim(),
                  })
                }
                className="px-3 py-2 rounded bg-[#20bec4] text-black"
              >
                Add
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {values.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 bg-[#062d2d] px-3 py-1 rounded-full text-sm"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(s)}
                    className="text-xs text-red-300"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Small file input fallback */}
          <div className="mt-4">
            <label className="block text-sm text-gray-300 mb-2">
              Attach resume (PDF / DOC)
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx,.pptx,.ppt"
              onChange={onFileChange}
              className="text-sm text-gray-300"
            />
            {values.cvFileName && (
              <p className="text-xs text-A-300 mt-2">
                Uploaded file: {values.cvFileName}
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded bg-[#20bec4] text-black font-semibold ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#0ea6a9]"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded border border-[#174b4b] text-gray-200"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
