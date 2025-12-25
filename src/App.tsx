import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-semibold mb-12 text-brown-600">
            Base style
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Colors Section */}
            <div>
              <h2 className="text-2xl font-medium mb-6 text-brown-400">
                Colors
              </h2>

              {/* Base Colors */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 text-brown-500">
                  Base
                </h3>
                <div className="grid grid-cols-7 gap-3">
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--color-brown-600)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">
                      Brown 600
                    </p>
                    <p className="text-xs text-brown-400">#26231E</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--color-brown-500)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">
                      Brown 500
                    </p>
                    <p className="text-xs text-brown-400">#434038</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--color-brown-400)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">
                      Brown 400
                    </p>
                    <p className="text-xs text-brown-400">#75716B</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--color-brown-300)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">
                      Brown 300
                    </p>
                    <p className="text-xs text-brown-400">#DAD6D1</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--color-brown-200)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">
                      Brown 200
                    </p>
                    <p className="text-xs text-brown-400">#EFEEEB</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--color-brown-100)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">
                      Brown 100
                    </p>
                    <p className="text-xs text-brown-400">#F9F8F6</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2 border border-brown-200"
                      style={{ backgroundColor: "var(--color-white)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">White</p>
                    <p className="text-xs text-brown-400">#FFFFFF</p>
                  </div>
                </div>
              </div>

              {/* Brand Colors */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-brown-500">
                  Brand
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--color-brand-orange)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">Orange</p>
                    <p className="text-xs text-brown-400">#F2B68C</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--color-brand-green)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">Green</p>
                    <p className="text-xs text-brown-400">#12B279</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{
                        backgroundColor: "var(--color-brand-green-soft)",
                      }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">Green</p>
                    <p className="text-xs text-brown-400">#D7F2E9</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--color-brand-red)" }}
                    ></div>
                    <p className="text-xs font-medium text-brown-600">Red</p>
                    <p className="text-xs text-brown-400">#EB5164</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fonts Section */}
            <div>
              <h2 className="text-2xl font-medium mb-6 text-brown-400">
                Fonts
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-headline-1 text-brown-600">Headline 1</p>
                </div>
                <div>
                  <p className="text-headline-2 text-brown-600">Headline 2</p>
                </div>
                <div>
                  <p className="text-headline-3 text-brown-600">Headline 3</p>
                </div>
                <div>
                  <p className="text-headline-4 text-brown-600">Headline 4</p>
                  <span className="inline-block h-1 w-full bg-yellow-400 -mt-2"></span>
                </div>
                <div>
                  <p className="text-body-1 text-brown-600">Body 1</p>
                </div>
                <div>
                  <p className="text-body-2 text-brown-600">Body 2</p>
                </div>
                <div>
                  <p className="text-body-2 text-brown-600">Body 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
