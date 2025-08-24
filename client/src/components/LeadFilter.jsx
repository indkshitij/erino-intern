import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const LeadFilter = ({
  status,
  setStatus,
  source,
  setSource,
  qualified,
  setQualified,
  searchEmail,
  setSearchEmail,
  searchCompany,
  setSearchCompany,
  searchCity,
  setSearchCity,
  scoreMin,
  setScoreMin,
  scoreMax,
  setScoreMax,
  valueMin,
  setValueMin,
  valueMax,
  setValueMax,
  lastAfter,
  setLastAfter,
  lastBefore,
  setLastBefore,
}) => {
  return (
    <div className="bg-white rounded-md p-6 shadow-md border border-gray-300">

      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        Filters
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
              <SelectItem value="won">Won</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Source
          </label>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="facebook_ads">Facebook Ads</SelectItem>
              <SelectItem value="google_ads">Google Ads</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Qualified
          </label>
          <div className="flex items-center justify-between border rounded-lg px-3 py-2">
            <Switch
              checked={qualified === true}
              onCheckedChange={(v) => setQualified(v)}
            />
            <span className="text-sm text-gray-600">
             {qualified === null ? "Any" : qualified ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email contains
          </label>
          <Input
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Company contains
          </label>
          <Input
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            City contains
          </label>
          <Input
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Score Min
          </label>
          <Input
            type="number"
            value={scoreMin}
            onChange={(e) => setScoreMin(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Score Max
          </label>
          <Input
            type="number"
            value={scoreMax}
            onChange={(e) => setScoreMax(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Value Min
          </label>
          <Input
            type="number"
            value={valueMin}
            onChange={(e) => setValueMin(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Value Max
          </label>
          <Input
            type="number"
            value={valueMax}
            onChange={(e) => setValueMax(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Last Activity After
          </label>
          <Input
            type="date"
            value={lastAfter}
            onChange={(e) => setLastAfter(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Last Activity Before
          </label>
          <Input
            type="date"
            value={lastBefore}
            onChange={(e) => setLastBefore(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LeadFilter;
