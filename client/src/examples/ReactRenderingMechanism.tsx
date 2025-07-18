import React, { useState } from "react";

// Simple component to track rendering
const TrackedComponent: React.FC<{ name: string; color: string }> = ({
  name,
  color,
}) => {
  console.log(`🎯 ${name} function called with props:`, { name, color });
  return (
    <div className={`p-4 rounded-lg ${color} border-2 border-gray-300`}>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm">I was rendered!</p>
    </div>
  );
};

// Custom renderer to simulate React's process
const customRenderer = (element: React.ReactElement) => {
  console.log("🔧 Custom Renderer received element:", element);

  // Step 1: Extract the component function and props
  const ComponentFunction = element.type as React.FC<any>;
  const props = element.props;

  console.log("📦 Extracted component function:", ComponentFunction.name);
  console.log("📦 Extracted props:", props);

  // Step 2: Call the component function with props
  console.log("⚡ Calling component function...");
  const result = ComponentFunction(props);

  console.log("📄 Component function returned:", result);

  return result;
};

const RenderingMechanism: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  // Create an element (Phase 1)
  const element = (
    <TrackedComponent name="Demo Component" color="bg-blue-100" />
  );

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          How React Renders Elements
        </h3>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Step 1 */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">
              Step 1: Element Object
            </h4>
            <div className="bg-white p-3 rounded text-xs font-mono">
              <div className="text-blue-600">element = {`{`}</div>
              <div className="ml-2 text-green-600">type: TrackedComponent,</div>
              <div className="ml-2 text-purple-600">
                props: {`{ name: "Demo", color: "bg-blue-100" }`}
              </div>
              <div className="text-blue-600">{`}`}</div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500">
            <h4 className="text-lg font-semibold text-green-800 mb-3">
              Step 2: React's Process
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">1.</span>
                <span>Extract element.type (function)</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">2.</span>
                <span>Extract element.props</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">3.</span>
                <span>Call function(props)</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">4.</span>
                <span>Get returned JSX</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h4 className="text-lg font-semibold text-purple-800 mb-3">
              Step 3: Final Result
            </h4>
            <div className="bg-white p-3 rounded text-xs font-mono">
              <div className="text-purple-600">&lt;div className="..."&gt;</div>
              <div className="ml-2 text-blue-600">
                &lt;h4&gt;Demo Component&lt;/h4&gt;
              </div>
              <div className="ml-2 text-green-600">
                &lt;p&gt;I was rendered!&lt;/p&gt;
              </div>
              <div className="text-purple-600">&lt;/div&gt;</div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
          <h4 className="text-xl font-semibold text-amber-800 mb-4">
            🔬 Interactive Demo
          </h4>
          <p className="text-amber-700 mb-4">
            Watch the console to see the exact process React uses to render
            elements!
          </p>

          <button
            onClick={() => setShowDemo(!showDemo)}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            {showDemo ? "Hide" : "Show"} Rendering Process
          </button>
        </div>

        {showDemo && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-3">
                React's Built-in Renderer:
              </h5>
              {element}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-3">
                Our Custom Renderer (same process):
              </h5>
              {customRenderer(element)}
            </div>
          </div>
        )}

        {/* Key Insights */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-lg border-l-4 border-gray-500 mt-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            🎯 Key Insights
          </h4>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">🔍</span>
              <span>
                React extracts the{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">type</code>{" "}
                (your component function) from the element object
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">📦</span>
              <span>
                React passes the{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">props</code>{" "}
                object to your component function
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-3 mt-1">⚡</span>
              <span>
                Your component function returns new JSX (more elements!)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-3 mt-1">🔄</span>
              <span>
                React repeats this process recursively until it reaches native
                DOM elements
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RenderingMechanism;
